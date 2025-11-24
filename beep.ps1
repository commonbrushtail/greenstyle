# Simple beep using Windows system sounds
# This should work on all Windows systems

# Try multiple methods to ensure sound plays
try {
    # Method 1: System beep
    [console]::beep(800, 200)
  
    
} catch {
    # Fallback: console beep
    [console]::beep(800, 200)
}
