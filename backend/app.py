from flask import Flask
from flask_cors import CORS
from routes.strategy import strategy_bp


from routes.telemetry import telemetry_bp
from routes.pitstops import pitstops_bp
from routes.weather import weather_bp
from routes.trackstatus import trackstatus_bp

app = Flask(__name__)

CORS(app)


# Enregistrement des routes

app.register_blueprint(
    strategy_bp
)

app.register_blueprint(
    telemetry_bp
)

app.register_blueprint(
    pitstops_bp
)

app.register_blueprint(
    weather_bp
)
app.register_blueprint(
    trackstatus_bp 
)
@app.route("/")
def home():

    return {
        "name":"F1 Analysis API",
        "version":"1.0",
        "status":"online"
    }


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )