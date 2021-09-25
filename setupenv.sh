#!/bin/bash
#
# sudo apt-get install python-venv
#
echo "Setting up Python environment (Linux or WSL)..."

python3 -m venv ./env
source env/bin/activate
pip3 install -r requirements.txt
echo "Setup Complete."