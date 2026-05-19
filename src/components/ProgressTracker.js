import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, RotateCcw, Trophy, Target, BookOpen, Dumbbell, Play } from 'lucide-react';

const ProgressTracker = ({ beltProgression }) => {
  const [userProgress, setUserProgress] = useState({});
  const [selectedBelt, setSelectedBelt] = useState('toYellow');

  // Load user progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('judoProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    } else {
      // Initialize progress for all belt levels
      const initialProgress = {};
      Object.keys(beltProgression).forEach(beltKey => {
        initialProgress[beltKey] = initializeBeltProgress(beltProgression[beltKey].requirements);
      });
      setUserProgress(initialProgress);
    }
  }, [beltProgression]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('judoProgress', JSON.stringify(userProgress));
  }, [userProgress]);

   // Initialize progress for a belt level
  const initializeBeltProgress = (requirements) => {
    const progress = {};
    const initializeSection = (section) => {
      if (typeof section === 'string') return false;
      if (Array.isArray(section)) return section.map(item => {
        // If the array item is an object (like terminology), initialize it properly
        if (typeof item === 'object' && item !== null) {
          const obj = {};
          Object.keys(item).forEach(key => {
            obj[key] = initializeSection(item[key]);
          });
          return obj;
        }
        // Otherwise, return false for string items
        return false;
      });
      if (typeof section === 'object' && section !== null) {
        const obj = {};
        Object.keys(section).forEach(key => {
          obj[key] = initializeSection(section[key]);
        });
        return obj;
      }
      return false;
    };

    Object.keys(requirements).forEach(category => {
      if (requirements[category] !== null && typeof requirements[category] === 'object') {
        progress[category] = initializeSection(requirements[category]);
      } else {
        progress[category] = initializeSection(requirements[category]);
      }
    });

    return progress;
  };

  // Reset progress for a specific belt
  const resetBeltProgress = (beltKey) => {
    setUserProgress(prev => ({
      ...prev,
      [beltKey]: initializeBeltProgress(beltProgression[beltKey].requirements)
    }));
 };

  // Calculate progress percentage for a belt
  const calculateBeltProgress = (beltKey) => {
    const requirements = beltProgression[beltKey]?.requirements || {};
    const progress = userProgress[beltKey] || {};

    let total = 0;
    let completed = 0;

    const countProgress = (req, prog) => {
      if (typeof prog === 'boolean') {
        total++;
        if (prog) completed++;
      } else if (Array.isArray(prog)) {
        prog.forEach((item, idx) => {
          if (typeof item === 'boolean') {
            total++;
            if (item) completed++;
          } else if (typeof item === 'object') {
            // Handle nested objects like terminology
            Object.keys(item).forEach(key => {
              total++;
              if (item[key]) completed++;
            });
          }
        });
      } else if (typeof prog === 'object' && prog !== null) {
        Object.keys(prog).forEach(key => {
          if (req && req[key] !== undefined) {
            countProgress(req[key], prog[key]);
          }
        });
      }
    };

    countProgress(requirements, progress);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

   // Get all requirements for a category
  const getRequirementsForCategory = (requirements, category, path = []) => {
    const items = [];
    const req = requirements[category];

    // Check if req exists before processing
    if (req === undefined || req === null) {
      return items; // Return empty array if category doesn't exist
    }

    if (Array.isArray(req)) {
      req.forEach((item, index) => {
        if (typeof item === 'string') {
          items.push({
            path: [...path, index],
            label: item,
            type: 'requirement'
          });
        } else if (typeof item === 'object' && item.name) {
          items.push({
            path: [...path, index],
            label: item.name,
            type: 'technique'
          });
        } else if (typeof item === 'object') {
          // Handle terminology objects
          if (item.japanese && item.english) {
            items.push({
              path: [...path, index],
              label: `${item.japanese} - ${item.english}`,
              type: 'terminology'
            });
          } else {
            // Handle other object types
            Object.keys(item).forEach(key => {
              items.push({
                path: [...path, index, key],
                label: `${key}: ${item[key]}`,
                type: 'requirement'
              });
            });
          }
        }
      });
    } else if (typeof req === 'object') {
      Object.keys(req).forEach(key => {
        if (Array.isArray(req[key])) {
          req[key].forEach((item, index) => {
            if (typeof item === 'string') {
              items.push({
                path: [...path, key, index],
                label: item,
                type: 'requirement'
              });
            } else if (typeof item === 'object' && item.name) {
              items.push({
                path: [...path, key, index],
                label: item.name,
                type: 'technique'
              });
            } else if (typeof item === 'object' && item.japanese && item.english) {
              items.push({
                path: [...path, key, index],
                label: `${item.japanese} - ${item.english}`,
                type: 'terminology'
              });
            }
          });
        } else {
          items.push({
            path: [...path, key],
            label: key,
            type: 'category'
          });
        }
      });
    }

    return items;
  };

  // Get icon based on type
  const getIcon = (type) => {
    switch (type) {
      case 'technique': return <Play size={16} className="text-red-400" />;
      case 'terminology': return <BookOpen size={16} className="text-purple-400" />;
      case 'category': return <Target size={16} className="text-yellow-400" />;
      default: return <Dumbbell size={16} className="text-green-400" />;
    }
  };

  // Get progress for a specific path
  const getProgressAtPath = (progress, path) => {
    let current = progress;
    for (const key of path) {
      if (current === undefined) return false;
      current = current[key];
    }
    return current;
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Trophy size={24} className="mr-2 text-yellow-400" />
          Progress Tracker
        </h3>
        <button
          onClick={() => resetBeltProgress(selectedBelt)}
          className="flex items-center text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
        >
          <RotateCcw size={14} className="mr-1" />
          Reset
        </button>
      </div>

      {/* Belt Selection */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(beltProgression).map(beltKey => (
            <button
              key={beltKey}
              onClick={() => setSelectedBelt(beltKey)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedBelt === beltKey
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {beltProgression[beltKey].name}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>Progress: {calculateBeltProgress(selectedBelt)}%</span>
            <span>{Object.keys(userProgress[selectedBelt] || {}).length} items</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${calculateBeltProgress(selectedBelt)}%` }}
            ></div>
          </div>
        </div>
      </div>

 {/* Requirements List */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {(() => {
          const requirements = beltProgression[selectedBelt]?.requirements || {};
          const progress = userProgress[selectedBelt] || {};
          
          // Get all requirement categories
          const categories = Object.keys(requirements);
          
          return categories.map(category => {
            const categoryItems = getRequirementsForCategory(requirements, category, [category]);
            const completedCount = categoryItems.filter(item => getProgressAtPath(progress, item.path)).length;
            const totalCount = categoryItems.length;
            const categoryProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            return (
              <div key={category} className="border border-gray-600 rounded-lg p-4 bg-gray-750">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-lg text-white capitalize flex items-center">
                    {getIcon('category')}
                    <span className="ml-2">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </h4>
                  <div className="text-sm text-gray-300">
                    {completedCount}/{totalCount} ({categoryProgress}%)
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${categoryProgress}%` }}
                  ></div>
                </div>
                
                <div className="space-y-2">
                  {categoryItems.map((item, index) => {
                    const isCompleted = getProgressAtPath(progress, item.path);
                    return (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-700 rounded">
                        <div className="flex items-center flex-1 min-w-0">
                          {getIcon(item.type)}
                          <span className="ml-2 text-gray-200 truncate">{item.label}</span>
                        </div>
                        <button
                          onClick={() => {
                            const newProgress = JSON.parse(JSON.stringify(progress));
                            let current = newProgress;
                            
                            // Navigate to the parent object, creating intermediate objects if needed
                            for (let i = 0; i < item.path.length - 1; i++) {
                              const pathKey = item.path[i];
                              if (current[pathKey] === undefined) {
                                // Check if the next path element suggests this should be an array or object
                                const nextPathIndex = i + 1;
                                if (nextPathIndex < item.path.length) {
                                  const nextPathKey = item.path[nextPathIndex];
                                  // If the next key is a number, initialize as array; otherwise as object
                                  current[pathKey] = typeof nextPathKey === 'number' ? [] : {};
                                } else {
                                  current[pathKey] = {};
                                }
                              }
                              current = current[pathKey];
                            }
                            
                            const lastKey = item.path[item.path.length - 1];
                            // Ensure the last key exists in the progress structure, initialize if not
                            if (current[lastKey] === undefined) {
                              // Determine the appropriate initial value based on requirements structure
                              const reqPath = [...item.path];
                              let reqValue = beltProgression[selectedBelt]?.requirements;
                              for (const pathKey of reqPath) {
                                if (reqValue && typeof reqValue === 'object') {
                                  reqValue = reqValue[pathKey];
                                } else {
                                  reqValue = undefined;
                                  break;
                                }
                              }
                              // Initialize based on what we find in requirements or default to false
                              current[lastKey] = reqValue !== undefined ? reqValue : false;
                            }
                            
                            // Toggle the value
                            if (typeof current[lastKey] === 'boolean') {
                              current[lastKey] = !current[lastKey];
                            } else if (typeof current[lastKey] === 'object') {
                              // If it's an object (like terminology), toggle all its values
                              Object.keys(current[lastKey]).forEach(key => {
                                if (typeof current[lastKey][key] === 'boolean') {
                                  current[lastKey][key] = !current[lastKey][key];
                                }
                              });
                            } else {
                              current[lastKey] = !Boolean(current[lastKey]);
                            }
                            
                            setUserProgress(prev => ({
                              ...prev,
                              [selectedBelt]: newProgress
                            }));
                          }}
                          className="ml-4 flex-shrink-0"
                        >
                          {isCompleted ? (
                            <CheckCircle size={20} className="text-green-500" />
                          ) : (
                            <Circle size={20} className="text-gray-500 hover:text-gray-40" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};

export default ProgressTracker;
