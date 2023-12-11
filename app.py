from flask import Flask, jsonify
import os
import ctypes

app = Flask(__name__)

def is_file_in_use(file_path):
    try:
        with open(file_path, 'r'):
            return False
    except Exception as e:
        return True

def delete_file(file_path):
    try:
        # Use the DeleteFile function from ctypes to delete the file even if it's in use
        ctypes.windll.kernel32.DeleteFileW(file_path)
        return True
    except Exception as e:
        print(f"Error deleting {file_path}: {e}")
        return False

def clean_directory(directory):
    try:
        files_deleted = []
        for root, dirs, files in os.walk(directory):
            for file in files:
                file_path = os.path.join(root, file)
                try:
                    if not is_file_in_use(file_path):
                        if delete_file(file_path):
                            files_deleted.append(file_path)
                            print(f"Deleted: {file_path}")
                        else:
                            print(f"Failed to delete: {file_path}")
                    else:
                        print(f"Skipping file in use: {file_path}")
                except Exception as e:
                    print(f"Error deleting {file_path}: {e}")
        return files_deleted
    except Exception as e:
        print(f"Error cleaning {directory}: {e}")
        return None

@app.route('/clean-junk-files', methods=['GET'])
def clean_junk_files():
    directories_to_clean = [
        os.path.join(os.environ['TEMP']),
        os.path.join(os.environ['USERPROFILE'], 'AppData', 'Local', 'Temp')
        # Add more directories as needed
    ]

    cleaned_files = {}
    for directory in directories_to_clean:
        files_deleted = clean_directory(directory)
        cleaned_files[directory] = files_deleted

    return jsonify({"message": "Junk files cleaned successfully", "cleaned_files": cleaned_files})

if __name__ == '__main__':
    app.run(debug=True)
