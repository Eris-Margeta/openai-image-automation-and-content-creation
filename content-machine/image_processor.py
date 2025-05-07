import os

def find_image_text_pairs(folder_path):
    pairs = []
    for filename in os.listdir(folder_path):
        if filename.endswith('.jpg') or filename.endswith('.jpeg') or filename.endswith('.png'):
            base_name = os.path.splitext(filename)[0]
            text_path = os.path.join(folder_path, base_name + '.txt')
            if os.path.exists(text_path):
                pairs.append(filename)
    return pairs

def process_images_in_folder(folder_path):
    image_text_pairs = find_image_text_pairs(folder_path)
    return image_text_pairs

# Example usage (if needed)
folder_path = './uploads'
pairs = process_images_in_folder(folder_path)
