# -------------------------------
# 1️⃣ Base Image
# -------------------------------
FROM python:3.12-slim

# -------------------------------
# 2️⃣ Environment Settings
# -------------------------------
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# -------------------------------
# 3️⃣ System Dependencies
# -------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# -------------------------------
# 4️⃣ Install Python Dependencies
# -------------------------------
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# -------------------------------
# 5️⃣ Copy Application Code
# -------------------------------
COPY . .

# -------------------------------
# 6️⃣ Expose Port
# -------------------------------
EXPOSE 5000

# -------------------------------
# 7️⃣ Run With Gunicorn (Factory Pattern)
# -------------------------------
CMD ["gunicorn", \
    "--bind", "0.0.0.0:5000", \
    "--workers", "1", \
    "--threads", "2", \
    "--preload", \
    "--timeout", "130", \
    "main:create_app()"]