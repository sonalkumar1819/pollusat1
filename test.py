import serial
import re
import json

def extract_data(received_text):
    data = {
        'altitude': [],
        'temperature': [],
        'acceleration': {'ax': [], 'ay': [], 'az': []},
        'gyro': {'gx': [], 'gy': [], 'gz': []},
        'pressure': [],
        'latitude': [],
        'longitude': [],
        'co2': [],
        'no2': [],
        'so2': [],
        'o3': [],
        'ch4': [],
        'nh3': []
    }                                      
    pattern = r'[-+]?\d*\.\d+|[-+]?\d+'

    # Extract data from each line
    for line in received_text.strip().split('\n'):
        parts = re.findall(pattern, line)
        if len(parts) >= 14:  # Ensure there are enough elements in the 'parts' list
            data['altitude'].append(float(parts[2]))
            data['temperature'].append(float(parts[3]))
            data['acceleration']['ax'].append(float(parts[6]))
            data['acceleration']['ay'].append(float(parts[7]))
            data['acceleration']['az'].append(float(parts[8]))
            data['gyro']['gx'].append(float(parts[9]))
            data['gyro']['gy'].append(float(parts[10]))
            data['gyro']['gz'].append(float(parts[11]))
            data['pressure'].append(float(parts[4]))
            data['latitude'].append(float(parts[-4]))  
            data['longitude'].append(float(parts[-3]))  
            data['co2'].append(float(parts[-4]))   
            data['no2'].append(float(parts[-3]))   
            data['so2'].append(float(parts[-2]))   
            data['o3'].append(float(parts[-1]))    
            data['ch4'].append(float(parts[-8]))   
            data['nh3'].append(float(parts[-7]))   

    return data

def save_to_json(data, filename='pollution_data.json'):
    try:
        with open(filename, 'r') as file:
            existing_data = json.load(file)
    except FileNotFoundError:
        existing_data = {}

    # Update existing data with new data
    for key in data:
        if isinstance(data[key], list):
            existing_data[key] = existing_data.get(key, []) + data[key]
        elif isinstance(data[key], dict):
            if key not in existing_data:
                existing_data[key] = {}
            for sub_key in data[key]:
                existing_data[key][sub_key] = existing_data[key].get(sub_key, []) + data[key][sub_key]

    # Write updated data to JSON file
    with open(filename, 'w') as file:
        json.dump(existing_data, file, indent=4)

# Serial port configuration
serial_port = 'COM3'  # Change this to your serial port
baud_rate = 9600  # Change this to match your baud rate
file_path = "./pollution_data.json"  # File path to save JSON data

try:
    # Open the serial port
    ser = serial.Serial(serial_port, baud_rate)
    print(f"Connected to {serial_port} at {baud_rate} baud.")
    print("Data will be saved to:", file_path)

    # Continuously read from the serial port and update JSON
    while True:
        # Read data from serial port
        line = ser.readline().decode().strip()
        if line:  # Check if the received line is not empty
            print("Received:", line)
            
            # Extract data from received text
            data = extract_data(line)

            # Save data to JSON file
            save_to_json(data, filename=file_path)

except serial.SerialException as e:
    print(f"Failed to connect to {serial_port}: {e}")
except OSError as e:
    print(f"Failed to open/create file: {e}")
finally:
    # Close the serial port
    ser.close()
