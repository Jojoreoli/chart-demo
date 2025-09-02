import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import './App.css'

// Register all Chart.js components
Chart.register(...registerables)

function App() {
  const barChartRef = useRef<HTMLCanvasElement>(null)
  const lineChartRef = useRef<HTMLCanvasElement>(null)
  const pieChartRef = useRef<HTMLCanvasElement>(null)
  const radarChartRef = useRef<HTMLCanvasElement>(null)
  
  // Store chart instances for cleanup
  const barChartInstance = useRef<Chart | null>(null)
  const lineChartInstance = useRef<Chart | null>(null)
  const pieChartInstance = useRef<Chart | null>(null)
  const radarChartInstance = useRef<Chart | null>(null)

  // State for interactive features
  const [selectedTheme, setSelectedTheme] = useState('default')
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentYear, setCurrentYear] = useState(2024)
  const [showStats, setShowStats] = useState(false)

  // Theme configurations
  const themes = {
    default: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#ffd700'
    },
    ocean: {
      primary: '#1e3a8a',
      secondary: '#0ea5e9',
      accent: '#06b6d4'
    },
    forest: {
      primary: '#166534',
      secondary: '#22c55e',
      accent: '#84cc16'
    },
    sunset: {
      primary: '#dc2626',
      secondary: '#f97316',
      accent: '#fbbf24'
    }
  }

  // Enhanced animal data with more realistic values
  const animalData = {
    habitats: {
      labels: ['Tropical Rainforest', 'Arctic Tundra', 'Deep Ocean', 'African Savanna', 'Coral Reefs', 'Desert'],
      data: [120, 8, 200, 45, 25, 15]
    },
    speed: {
      labels: ['Dawn', 'Morning', 'Noon', 'Afternoon', 'Dusk', 'Night'],
      cheetah: [25, 85, 95, 70, 45, 20],
      peregrine: [40, 95, 110, 90, 60, 30],
      sailfish: [35, 80, 100, 85, 50, 25]
    },
    diet: {
      labels: ['Carnivores', 'Herbivores', 'Omnivores', 'Insectivores', 'Piscivores'],
      data: [28, 42, 18, 8, 4]
    },
    abilities: {
      labels: ['Speed', 'Strength', 'Intelligence', 'Agility', 'Endurance', 'Senses', 'Camouflage', 'Social Skills'],
      lion: [75, 90, 65, 80, 70, 85, 60, 75],
      dolphin: [85, 60, 90, 95, 80, 70, 40, 85],
      eagle: [90, 50, 75, 95, 65, 95, 70, 60],
      octopus: [40, 70, 85, 90, 60, 80, 95, 50]
    }
  }

  // Animation function
  const animateData = () => {
    setIsAnimating(true)
    const interval = setInterval(() => {
      setCurrentYear(prev => prev + 1)
    }, 1000)
    
    setTimeout(() => {
      clearInterval(interval)
      setIsAnimating(false)
    }, 5000)
  }

  useEffect(() => {
    // Cleanup function to destroy existing charts
    const cleanupCharts = () => {
      if (barChartInstance.current) {
        barChartInstance.current.destroy()
        barChartInstance.current = null
      }
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy()
        lineChartInstance.current = null
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy()
        pieChartInstance.current = null
      }
      if (radarChartInstance.current) {
        radarChartInstance.current.destroy()
        radarChartInstance.current = null
      }
    }

    // Clean up any existing charts first
    cleanupCharts()

    const currentTheme = themes[selectedTheme as keyof typeof themes]

    // Common responsive options with enhanced styling
    const responsiveOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: isAnimating ? 1000 : 2000,
        easing: 'easeInOutQuart' as const
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: window.innerWidth < 768 ? 12 : 14,
              family: "'Inter', sans-serif"
            },
            usePointStyle: true,
            padding: 20
          }
        }
      }
    }

    // Enhanced Bar Chart - Global Animal Population Distribution
    if (barChartRef.current) {
      const barCtx = barChartRef.current.getContext('2d')
      if (barCtx) {
        barChartInstance.current = new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: animalData.habitats.labels,
            datasets: [{
              label: `Population (millions) - ${currentYear}`,
              data: animalData.habitats.data,
              backgroundColor: [
                'rgba(34, 197, 94, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(251, 191, 36, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(239, 68, 68, 0.8)'
              ],
              borderColor: [
                'rgba(34, 197, 94, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(168, 85, 247, 1)',
                'rgba(251, 191, 36, 1)',
                'rgba(236, 72, 153, 1)',
                'rgba(239, 68, 68, 1)'
              ],
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false
            }]
          },
          options: {
            ...responsiveOptions,
            plugins: {
              ...responsiveOptions.plugins,
              title: {
                display: true,
                text: '🌍 Global Animal Population Distribution',
                font: { 
                  size: window.innerWidth < 768 ? 14 : 18,
                  family: "'Inter', sans-serif",
                  weight: 'bold'
                },
                color: currentTheme.primary
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: currentTheme.accent,
                borderWidth: 1,
                cornerRadius: 8
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  font: {
                    size: window.innerWidth < 768 ? 10 : 12,
                    family: "'Inter', sans-serif"
                  },
                  color: currentTheme.primary
                }
              },
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  font: {
                    size: window.innerWidth < 768 ? 10 : 12,
                    family: "'Inter', sans-serif"
                  },
                  color: currentTheme.primary
                }
              }
            }
          }
        })
      }
    }

    // Enhanced Line Chart - Animal Speed Patterns
    if (lineChartRef.current) {
      const lineCtx = lineChartRef.current.getContext('2d')
      if (lineCtx) {
        lineChartInstance.current = new Chart(lineCtx, {
          type: 'line',
          data: {
            labels: animalData.speed.labels,
            datasets: [{
              label: 'Cheetah 🐆',
              data: animalData.speed.cheetah,
              borderColor: '#f97316',
              backgroundColor: 'rgba(249, 115, 22, 0.1)',
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8
            }, {
              label: 'Peregrine Falcon 🦅',
              data: animalData.speed.peregrine,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8
            }, {
              label: 'Sailfish 🐟',
              data: animalData.speed.sailfish,
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8
            }]
          },
          options: {
            ...responsiveOptions,
            plugins: {
              ...responsiveOptions.plugins,
              title: {
                display: true,
                text: '⚡ Animal Speed Patterns Throughout the Day',
                font: { 
                  size: window.innerWidth < 768 ? 14 : 18,
                  family: "'Inter', sans-serif",
                  weight: 'bold'
                },
                color: currentTheme.primary
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: currentTheme.accent,
                borderWidth: 1,
                cornerRadius: 8
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  font: {
                    size: window.innerWidth < 768 ? 10 : 12,
                    family: "'Inter', sans-serif"
                  },
                  color: currentTheme.primary
                }
              },
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  font: {
                    size: window.innerWidth < 768 ? 10 : 12,
                    family: "'Inter', sans-serif"
                  },
                  color: currentTheme.primary
                }
              }
            }
          }
        })
      }
    }

    // Enhanced Pie Chart - Animal Diet Classification
    if (pieChartRef.current) {
      const pieCtx = pieChartRef.current.getContext('2d')
      if (pieCtx) {
        pieChartInstance.current = new Chart(pieCtx, {
          type: 'doughnut',
          data: {
            labels: animalData.diet.labels,
            datasets: [{
              data: animalData.diet.data,
              backgroundColor: [
                'rgba(239, 68, 68, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(251, 191, 36, 0.8)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(59, 130, 246, 0.8)'
              ],
              borderColor: [
                'rgba(239, 68, 68, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(251, 191, 36, 1)',
                'rgba(168, 85, 247, 1)',
                'rgba(59, 130, 246, 1)'
              ],
              borderWidth: 3
            }]
          },
          options: {
            ...responsiveOptions,
            plugins: {
              ...responsiveOptions.plugins,
              title: {
                display: true,
                text: '🍽️ Animal Diet Classification',
                font: { 
                  size: window.innerWidth < 768 ? 14 : 18,
                  family: "'Inter', sans-serif",
                  weight: 'bold'
                },
                color: currentTheme.primary
              },
              legend: {
                position: 'bottom',
                labels: {
                  font: {
                    size: window.innerWidth < 768 ? 10 : 12,
                    family: "'Inter', sans-serif"
                  },
                  usePointStyle: true,
                  padding: 20
                }
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: currentTheme.accent,
                borderWidth: 1,
                cornerRadius: 8
              }
            }
          }
        })
      }
    }

    // Enhanced Radar Chart - Animal Abilities Comparison
    if (radarChartRef.current) {
      const radarCtx = radarChartRef.current.getContext('2d')
      if (radarCtx) {
        radarChartInstance.current = new Chart(radarCtx, {
          type: 'radar',
          data: {
            labels: animalData.abilities.labels,
            datasets: [{
              label: 'Lion 🦁',
              data: animalData.abilities.lion,
              borderColor: '#f97316',
              backgroundColor: 'rgba(249, 115, 22, 0.2)',
              borderWidth: 3,
              pointBackgroundColor: '#f97316',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#f97316'
            }, {
              label: 'Dolphin 🐬',
              data: animalData.abilities.dolphin,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderWidth: 3,
              pointBackgroundColor: '#3b82f6',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#3b82f6'
            }, {
              label: 'Eagle 🦅',
              data: animalData.abilities.eagle,
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              borderWidth: 3,
              pointBackgroundColor: '#8b5cf6',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#8b5cf6'
            }, {
              label: 'Octopus 🐙',
              data: animalData.abilities.octopus,
              borderColor: '#ec4899',
              backgroundColor: 'rgba(236, 72, 153, 0.2)',
              borderWidth: 3,
              pointBackgroundColor: '#ec4899',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#ec4899'
            }]
          },
          options: {
            ...responsiveOptions,
            plugins: {
              ...responsiveOptions.plugins,
              title: {
                display: true,
                text: '🎯 Animal Abilities Comparison',
                font: { 
                  size: window.innerWidth < 768 ? 14 : 18,
                  family: "'Inter', sans-serif",
                  weight: 'bold'
                },
                color: currentTheme.primary
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: currentTheme.accent,
                borderWidth: 1,
                cornerRadius: 8
              }
            },
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  font: {
                    size: window.innerWidth < 768 ? 10 : 12,
                    family: "'Inter', sans-serif"
                  },
                  color: currentTheme.primary,
                  stepSize: 20
                },
                pointLabels: {
                  font: {
                    size: window.innerWidth < 768 ? 10 : 12,
                    family: "'Inter', sans-serif"
                  },
                  color: currentTheme.primary
                }
              }
            }
          }
        })
      }
    }

    // Cleanup function to run when component unmounts
    return cleanupCharts
  }, [selectedTheme, isAnimating, currentYear])

  return (
    <div className="app" style={{
      background: `linear-gradient(135deg, ${themes[selectedTheme as keyof typeof themes].primary} 0%, ${themes[selectedTheme as keyof typeof themes].secondary} 100%)`
    }}>
      <header className="header">
        <h1 className="main-title">
          <span className="title-icon">🐾</span>
          Animal Kingdom Analytics
          <span className="title-icon">🐾</span>
        </h1>
        <p className="subtitle">Advanced Data Visualization & Wildlife Insights</p>
      </header>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="theme-select">Theme:</label>
          <select 
            id="theme-select"
            value={selectedTheme} 
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="theme-select"
          >
            <option value="default">Default</option>
            <option value="ocean">Ocean</option>
            <option value="forest">Forest</option>
            <option value="sunset">Sunset</option>
          </select>
        </div>

        <div className="control-group">
          <button 
            onClick={animateData}
            disabled={isAnimating}
            className={`animate-btn ${isAnimating ? 'animating' : ''}`}
          >
            {isAnimating ? '⏳ Animating...' : '🚀 Animate Data'}
          </button>
        </div>

        <div className="control-group">
          <button 
            onClick={() => setShowStats(!showStats)}
            className="stats-btn"
          >
            {showStats ? '📊 Hide Stats' : '📊 Show Stats'}
          </button>
        </div>
      </div>

      {showStats && (
        <div className="stats-panel">
          <div className="stat-card">
            <h3>🌍 Total Species</h3>
            <p className="stat-number">8.7M+</p>
            <p className="stat-desc">Estimated animal species</p>
          </div>
          <div className="stat-card">
            <h3>⚡ Fastest Animal</h3>
            <p className="stat-number">110 km/h</p>
            <p className="stat-desc">Peregrine Falcon dive</p>
          </div>
          <div className="stat-card">
            <h3>🧠 Smartest</h3>
            <p className="stat-number">Dolphin</p>
            <p className="stat-desc">High intelligence quotient</p>
          </div>
          <div className="stat-card">
            <h3>🦈 Oldest Species</h3>
            <p className="stat-number">450M years</p>
            <p className="stat-desc">Shark evolution</p>
          </div>
        </div>
      )}
      
      <div className="charts-grid">
        <div className="chart-container">
          <canvas ref={barChartRef}></canvas>
        </div>
        
        <div className="chart-container">
          <canvas ref={lineChartRef}></canvas>
        </div>
        
        <div className="chart-container">
          <canvas ref={pieChartRef}></canvas>
        </div>
        
        <div className="chart-container">
          <canvas ref={radarChartRef}></canvas>
        </div>
      </div>
      
      <footer className="footer">
        <div className="footer-content">
          <p>
            Created with ❤️ by{' '}
            <a 
              href="https://github.com/Jojoreoli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
            >
              João Pedro Reis de Oliveira
            </a>
            {' '}🐾
          </p>
          <p className="footer-tech">
            Built with React, TypeScript, Chart.js & Vite
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
