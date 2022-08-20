
import tkinter as tk
"""import tkMessageBox
import tkFont"""
from PIL import ImageTk,Image

class AppConvertTo:
    def __init__(self):
        self.window = tk.Tk()
        #self.window.geometry("1280x720")
        self.setBackground()
        
        """
        #app.configure(background='C:\\Usfront.png')
        #app.configure(background = image1)

        labelText = StringVar()
        labelText.set("Welcome !!!!")
        #labelText.fontsize('10')

        label1 = Label(app, image=image1, textvariable=labelText,
                    font=("Times New Roman", 24),
                    justify=CENTER, height=4, fg="blue")
        label1.pack()"""

    def setBackground(self):
        image2 =Image.open('convertTo.png')
        bg = ImageTk.PhotoImage(image2)
        w = bg.width()
        h = bg.height()
        self.window.geometry('%dx%d+0+0' % (w,h))
        

    def loop(self):
        self.window.mainloop()

app = AppConvertTo()
app.loop()