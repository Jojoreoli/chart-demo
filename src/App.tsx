import { useEffect, useRef } from 'react'
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

    // Bar Chart - Animal Population in Different Habitats
    if (barChartRef.current) {
      const barCtx = barChartRef.current.getContext('2d')
      if (barCtx) {
        barChartInstance.current = new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: ['Forest', 'Desert', 'Ocean', 'Mountains', 'Savanna'],
            datasets: [{
              label: 'Animal Population (billions)',
              data: [45, 12, 78, 23, 34],
              backgroundColor: [
                '#4CAF50',
                '#FF9800',
                '#2196F3',
                '#9C27B0',
                '#FF5722'
              ],
              borderColor: [
                '#388E3C',
                '#F57C00',
                '#1976D2',
                '#7B1FA2',
                '#D84315'
              ],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Animal Population by Habitat',
                font: { size: 16 }
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        })
      }
    }

    // Line Chart - Animal Speed Over Time
    if (lineChartRef.current) {
      const lineCtx = lineChartRef.current.getContext('2d')
      if (lineCtx) {
        lineChartInstance.current = new Chart(lineCtx, {
          type: 'line',
          data: {
            labels: ['Morning', 'Noon', 'Afternoon', 'Evening', 'Night'],
            datasets: [{
              label: 'Cheetah Speed (km/h)',
              data: [30, 80, 45, 60, 25],
              borderColor: '#FF5722',
              backgroundColor: 'rgba(255, 87, 34, 0.1)',
              tension: 0.4
            }, {
              label: 'Eagle Speed (km/h)',
              data: [40, 90, 70, 85, 35],
              borderColor: '#2196F3',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Animal Speed Throughout the Day',
                font: { size: 16 }
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        })
      }
    }

    // Pie Chart - Animal Diet Distribution
    if (pieChartRef.current) {
      const pieCtx = pieChartRef.current.getContext('2d')
      if (pieCtx) {
        pieChartInstance.current = new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: ['Carnivores', 'Herbivores', 'Omnivores', 'Insectivores'],
            datasets: [{
              data: [25, 40, 20, 15],
              backgroundColor: [
                '#F44336',
                '#4CAF50',
                '#FF9800',
                '#9C27B0'
              ],
              borderColor: [
                '#D32F2F',
                '#388E3C',
                '#F57C00',
                '#7B1FA2'
              ],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Animal Diet Distribution',
                font: { size: 16 }
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        })
      }
    }

    // Radar Chart - Animal Abilities Comparison
    if (radarChartRef.current) {
      const radarCtx = radarChartRef.current.getContext('2d')
      if (radarCtx) {
        radarChartInstance.current = new Chart(radarCtx, {
          type: 'radar',
          data: {
            labels: ['Speed', 'Strength', 'Intelligence', 'Agility', 'Endurance', 'Senses'],
            datasets: [{
              label: 'Lion',
              data: [70, 90, 60, 80, 75, 85],
              borderColor: '#FF9800',
              backgroundColor: 'rgba(255, 152, 0, 0.2)',
              borderWidth: 2
            }, {
              label: 'Dolphin',
              data: [85, 60, 90, 95, 80, 70],
              borderColor: '#2196F3',
              backgroundColor: 'rgba(33, 150, 243, 0.2)',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Animal Abilities Comparison',
                font: { size: 16 }
              }
            },
            scales: {
              r: {
                beginAtZero: true,
                max: 100
              }
            }
          }
        })
      }
    }

    // Cleanup function to run when component unmounts
    return cleanupCharts
  }, [])

  return (
    <div className="app">
      <h1>Animals</h1>
      
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
    </div>
  )
}

export default App
