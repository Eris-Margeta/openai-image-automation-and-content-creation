import cv2
import numpy as np

def get_average_color(image_path):
    image = cv2.imread(image_path)
    avg_color_per_row = np.mean(image, axis=0)
    avg_color = np.mean(avg_color_per_row, axis=0)
    # Convert to integer
    avg_color = tuple(map(int, avg_color))
    return avg_color
