FROM python:3.12-slim

# Set working directory to app
WORKDIR /app

RUN apt-get update --fix-missing \
    && apt-get install -y --fix-missing build-essential \
    && apt-get -y install git

# Copy requirements.txt and requirements.dev.txt to the container
COPY requirements.txt requirements.txt

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy your Flask application code
COPY . .

# Expose the port your Flask app will listen on (e.g., 5000)
EXPOSE 5000

# Define the command to run your Flask app
CMD ["flask", "run", "--host=0.0.0.0"]