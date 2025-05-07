import os
from PIL import Image, ImageDraw, ImageFont
from color_analysis import get_average_color

def determine_text_color(avg_color):
    if sum(avg_color) / 3 > 128:
        return (0, 0, 0)  # Dark text for light background
    else:
        return (255, 255, 255)  # Light text for dark background

def create_combined_image(image_path, text_path, output_path, avg_color):
    original_image = Image.open(image_path)
    with open(text_path, 'r') as file:
        text = file.read()

    new_width = original_image.width * 2
    new_image = Image.new('RGB', (new_width, original_image.height), color=avg_color)
    new_image.paste(original_image, (0, 0))

    draw = ImageDraw.Draw(new_image)
    text_color = determine_text_color(avg_color)

    font_size = int(original_image.width * 0.35 / 2)
    font = ImageFont.truetype("notosans.ttf", font_size)


    text_width, text_height = draw.textsize(text, font=font)
    text_x = original_image.width + (original_image.width - text_width) // 2
    text_y = (original_image.height - text_height) // 2

    draw.text((text_x, text_y), text, fill=text_color, font=font)

    new_image.save(output_path)

def process_folder(folder_path, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(folder_path):
        if filename.endswith('.jpg'):
            base_name = os.path.splitext(filename)[0]
            image_path = os.path.join(folder_path, filename)
            text_path = os.path.join(folder_path, base_name + '.txt')
            output_image_path = os.path.join(output_folder, base_name + '_combined.jpg')

            if os.path.exists(text_path):
                avg_color = get_average_color(image_path)
                create_combined_image(image_path, text_path, output_image_path, avg_color)

process_folder('./uploads', './content')
