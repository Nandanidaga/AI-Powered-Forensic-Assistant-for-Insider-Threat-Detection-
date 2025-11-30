# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install uv, the fast package manager
RUN pip install uv

# Copy the requirements file into the container
COPY requirements.txt .

# Use uv to install the dependencies
# Add the --system flag here to install into the container's main Python environment
RUN uv pip install --system --no-cache -r requirements.txt

# Copy the rest of the backend application, including the models directory
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Run the application with Gunicorn for production
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]