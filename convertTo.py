from PIL import Image
import aspose.words as aw

def removeExtention(file_path):
    path_part = file_path.split('.')
    new_path = path_part[0]
    #print(new_path)
    return new_path

def convertImgToPdf(image_path):
    try:
        image = Image.open(image_path)
        pdf = image.convert('RGB')
        pdf_path = removeExtention(image_path)+".pdf"
        pdf.save(pdf_path)
    except FileNotFoundError as fnf:
        raise fnf

def convertImgToWord(image_path):
    try:
        doc = aw.Document()
        builder = aw.DocumentBuilder(doc)
        builder.insert_image(image_path)
        docx_path = removeExtention(image_path)+".docx"
        doc.save(docx_path)
    except FileNotFoundError as fnf:
        raise fnf

def convertPdfToWord(pdf_path):
    try:
        doc = aw.Document(pdf_path)
        docx_path = removeExtention(pdf_path)+"docx"
        doc.save(docx_path)
    except FileNotFoundError as fnf:
        raise fnf

def main():
    # convertToPdf
    #convertImgToPdf('test_files/téléchargement.jpeg')
    #convertImgToWord('test_files/K.png')
    convertPdfToWord('test_files/Amplification_puissance.pdf')
    pass

main()
#removeExtention("test_files/result3.img")