import os
from flask import Flask, render_template, request, flash, redirect, url_for
import convertTo as ct

UPLOAD_FOLDER = 'static/file_convert'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = "122222222"

@app.route("/")
def index():
    flash("null")
    return render_template("index.html")


@app.route("/convertTo", methods=["POST", "GET"])
def convertTo():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('champ file non trouve fichier')
            return redirect(request.url)
        file = request.files["file"]
        if file.filename == '':
            flash('aucun fichier')
            return redirect(request.url)
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        convertire = str(request.form['file_type_origin'])
        en = str(request.form['file_type_want'])
        path = app.config['UPLOAD_FOLDER']+'/'+filename

        if convertire in ["png", "jpeg", "jpg"] and en == "pdf":
            flash(ct.convertImgToPdf(path))
        elif convertire in ["png", "jpeg", "jpg"] and en == "docx":
            flash(ct.convertImgToWord(path))
        elif convertire=="pdf" and en =="docx":
            flash(ct.convertPdfToWord(path))
        return render_template("index.html")
        
    return "Erreur"