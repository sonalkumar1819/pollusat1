import random
import json
import time

def generate_data():
    data = {
        "altitude": round(random.uniform(268, 271), 2),
        "temperature": round(random.uniform(29.0, 29.3), 1),
        "acceleration": {
            "ax": round(random.uniform(-0.1, -0.01), 2),
            "ay": round(random.uniform(-0.99, -0.97), 2),
            "az": round(random.uniform(-3.05, -2.38), 2)
        },
        "gyro": {
            "gx": round(random.uniform(-2.03, -1.23), 2),
            "gy": round(random.uniform(-0.73, -0.18), 2),
            "gz": 0.0
        },
        "pressure": 981.0,
        "latitude": 0.0,
        "longitude": 0.0,
        "co2": round(random.uniform(400, 420), 1),   # CO2 concentration in ppm
        "no2": round(random.uniform(10, 20), 2),     # NO2 concentration in ppm
        "so2": round(random.uniform(5, 15), 2),      # SO2 concentration in ppm
        "o3": round(random.uniform(30, 50), 2),      # O3 concentration in ppm
        "ch4": round(random.uniform(1.8, 2.2), 3),   # CH4 concentration in ppm
        "nh3": round(random.uniform(0.5, 1.5), 3)    # NH3 concentration in ppm
    }
    return data

def save_to_json(data, filename='pollution_data.json'):
    try:
        with open(filename, 'r') as file:
            existing_data = json.load(file)
    except FileNotFoundError:
        existing_data = {}

    for key in data:
        if key in existing_data:
            existing_data[key].append(data[key])
        else:
            existing_data[key] = [data[key]]

    with open(filename, 'w') as file:
        json.dump(existing_data, file, indent=4)

def print_data(data):
    print("Received:", json.dumps(data))

if __name__ == "__main__":
    try:
        while True:
            data = generate_data()
            save_to_json(data)
            print_data(data)
            time.sleep(10)  # Simulate data being received every 10 seconds
    except KeyboardInterrupt:
        print("Data generation stopped.")
