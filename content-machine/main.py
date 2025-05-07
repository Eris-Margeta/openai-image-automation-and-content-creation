import image_processor
import content_generator
import os

print("Starting image processing...")

# Find image-text pairs and generate new images
image_text_pairs = image_processor.process_images_in_folder('./uploads')

print(f"Found {len(image_text_pairs)} image-text pairs.")

# Generate new images with the provided descriptions
for pair in image_text_pairs:
    base_name = os.path.splitext(pair)[0]
    image_path = os.path.join('./uploads', pair)
    text_path = os.path.join('./uploads', base_name + '.txt')
    output_image_path = os.path.join('./content', base_name + '_combined.jpg')

    print(f"Processing {pair} with corresponding text file...")

    avg_color = content_generator.get_average_color(image_path)
    content_generator.create_combined_image(image_path, text_path, output_image_path, avg_color)

    print(f"Generated combined image for {pair} at {output_image_path}.")

print("Image processing completed.")
