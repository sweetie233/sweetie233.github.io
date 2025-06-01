import os
import json

def collect_all_images(root_dir="img"):
    image_extensions = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"}
    gallery_images = []

    for subdir, _, files in os.walk(root_dir):
        files = sorted(f for f in files if os.path.splitext(f)[1].lower() in image_extensions)
        if files:
            rel_dir = os.path.relpath(subdir, ".").replace("\\", "/")
            images = [f"<img src=\"../gallery/{rel_dir}/{f}\" alt=\"Gallery Image\" onclick=\"openModal(this)\">" for f in files]
            
            gimgs = [f"<div class=\"gallery-item\"><div class=\"content\"><img src=\"{rel_dir}/{f}\" alt=\"\"></div></div>" for f in files]
            gallery_images.extend(gimgs)

            # Write per-subfolder image list
            with open(os.path.join(subdir, "image_list.txt"), "w", encoding="utf-8") as f:
                for line in images:
                    f.write(line + "\n")

    return gallery_images

if __name__ == "__main__":
    all_paths = collect_all_images("img")
    with open("image_list.txt", "w", encoding="utf-8") as f:
        for line in all_paths:
            f.write(line + "\n")
        
        
    print(f"Collected {len(all_paths)} total images and wrote individual files per subfolder.")
