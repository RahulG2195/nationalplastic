#!/bin/bash

# Set variables
GIT_REPO_PATH="/var/www/nationalplastic"
UPLOAD_FOLDER="/var/www/uploads"
IMAGE_PATHS=("public/Assets/")  # Add all paths containing images

# Navigate to the git repository
cd $GIT_REPO_PATH

# Pull the latest changes
git pull

# Sync images for each path
for path in "${IMAGE_PATHS[@]}"
do
# Create the destination directory if it doesn't exist
  mkdir -p "$UPLOAD_FOLDER/$(dirname "$path")"

  # Use rsync without --delete to copy files from Git repo to upload folder
  rsync -av "$GIT_REPO_PATH/$path/" "$UPLOAD_FOLDER/$path/"
done

# Set correct permissions
chown -R www-data:www-data "$UPLOAD_FOLDER"
find "$UPLOAD_FOLDER" -type d -exec chmod 755 {} \;
find "$UPLOAD_FOLDER" -type f -exec chmod 644 {} \;

echo "Image sync completed."
