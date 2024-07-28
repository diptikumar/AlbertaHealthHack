
#This is the main appplication file where the Flask app is initiated and configured.
# It registers the blueprintsfor routing and defines the root routes.

from flask import Flask
from models import db
from routes.user_routes import user_bp

app = Flask(__name__)
app.config.from_pyfile('config.py')

db.init_app(app)

app.register_blueprint(user_bp, url_prefix='/api/users')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/search')
def search_page():
    return app.send_static_file('search.html')

if __name__ == '__main__':
    app.run(debug=True)
