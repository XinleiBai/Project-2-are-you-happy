import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/life_expectancy_satisfaction.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
# Samples_Metadata  = Base.classes.sample_metadata
# Samples = Base.classes.samples

LifeExpectancySatisfaction = Base.classes.life_expectancy_satisfaction
GdpTest = Base.classes.gdptest


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/life_expectancy_satisfactions")
def life_expectancy_satisfactions():
    """Return a list of 2015 data."""

    results = db.session.query(LifeExpectancySatisfaction).filter(LifeExpectancySatisfaction.Year == 2015).all()
    results2013 = db.session.query(LifeExpectancySatisfaction).filter(LifeExpectancySatisfaction.Year == 2013).all()
    population_dict = {}
    for result in results2013:
        population_dict[result.Entity] = result.population

    # Create a dictionary entry for each row of information
    json_results = []
    for result in results:
        json_results.append({
            "country": result.Entity,
            "lifeExpectancy": result.Life_expectancy,
            "lifeSatisfaction": result.Life_satisfaction,
            "population": population_dict[result.Entity]
        })

    return jsonify(json_results)

@app.route("/gdptest")
def gdptest():
    """Return a list of 2017 data."""

    results = db.session.query(GdpTest).filter(GdpTest.Year == 2017).all()


    # Create a dictionary entry for each row of information
    json_results = []
    for result in results:
        json_results.append({
            "country": result.Entity,
            "gdp": result.GDP,
            "lifeSatisfaction": result.Life_Satisfaction,
        })

    return jsonify(json_results)

@app.route("/happiness")
def happiness():
    """Return a list of 2017 data."""

    results = db.session.query(happiness).filter(happiness.Year == 2017).all()


    # Create a dictionary entry for each row of information
    json_results = []
    for result in results:
        json_results.append({
            "country": result.Entity,
            "happiness": result.happiness,
            "Latitude": result.Latitude,
            "longitude": result.longitude,
        })

    return jsonify(json_results)



if __name__ == "__main__":
    app.run()
