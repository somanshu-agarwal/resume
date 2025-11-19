// Data Manager - Handles all data operations
class DataManager {
    constructor() {
        this.data = {
            profile: null,
            experience: null,
            projects: null,
            skills: null,
            education: null,
            testimonials: null,
            hobbies: null
        };
        this.isLocalStorage = false;
    }

    // Initialize data manager
    async init() {
        try {
            // Check if we have data in localStorage
            const savedData = this.loadFromLocalStorage();
            
            if (savedData && Object.keys(savedData).length > 0) {
                this.data = savedData;
                this.isLocalStorage = true;
                console.log('Loaded data from localStorage');
            } else {
                // Load from JSON files
                await this.loadAllData();
                this.isLocalStorage = false;
                console.log('Loaded data from JSON files');
            }
            
            return this.data;
        } catch (error) {
            console.error('Error initializing data manager:', error);
            throw error;
        }
    }

    // Load all data from JSON files
    async loadAllData() {
        const files = [
            'profile',
            'experience', 
            'projects',
            'skills',
            'education',
            'testimonials',
            'hobbies'
        ];

        try {
            const loadPromises = files.map(file => 
                this.loadJSON(`data/${file}.json`)
                    .then(data => {
                        this.data[file] = data;
                    })
                    .catch(error => {
                        console.warn(`Failed to load ${file}.json:`, error);
                        this.data[file] = null;
                    })
            );

            await Promise.all(loadPromises);
            return this.data;
        } catch (error) {
            console.error('Error loading data files:', error);
            throw error;
        }
    }

    // Load individual JSON file
    async loadJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
            throw error;
        }
    }

    // Get data by type
    getData(type) {
        return this.data[type] || null;
    }

    // Update data
    updateData(type, newData) {
        if (this.data.hasOwnProperty(type)) {
            this.data[type] = newData;
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    // Save to localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('portfolioData', JSON.stringify(this.data));
            this.isLocalStorage = true;
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    // Load from localStorage
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('portfolioData');
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }

    // Export data as JSON
    exportData() {
        return JSON.stringify(this.data, null, 2);
    }

    // Import data from JSON string
    importData(jsonString) {
        try {
            const importedData = JSON.parse(jsonString);
            
            // Validate structure
            const requiredKeys = ['profile', 'experience', 'projects', 'skills', 'education', 'testimonials', 'hobbies'];
            const isValid = requiredKeys.every(key => importedData.hasOwnProperty(key));
            
            if (isValid) {
                this.data = importedData;
                this.saveToLocalStorage();
                return true;
            } else {
                throw new Error('Invalid data structure');
            }
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    // Reset to default (load from JSON files)
    async resetToDefault() {
        try {
            localStorage.removeItem('portfolioData');
            await this.loadAllData();
            this.isLocalStorage = false;
            return true;
        } catch (error) {
            console.error('Error resetting to default:', error);
            return false;
        }
    }

    // Get data source info
    getDataSource() {
        return this.isLocalStorage ? 'localStorage' : 'JSON files';
    }

    // Validate data structure
    validateData() {
        const issues = [];
        
        if (!this.data.profile) issues.push('Profile data missing');
        if (!this.data.experience || !Array.isArray(this.data.experience)) issues.push('Experience data invalid');
        if (!this.data.projects || !this.data.projects.projects) issues.push('Projects data invalid');
        if (!this.data.skills || !this.data.skills.categories) issues.push('Skills data invalid');
        
        return {
            isValid: issues.length === 0,
            issues: issues
        };
    }
}

// Create global instance
const dataManager = new DataManager();