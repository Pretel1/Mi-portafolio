import os
import fitz  # PyMuPDF

dir_path = r"d:\cv pretel\cv ofi\public\certificates"

def convert_all():
    print("Iniciando conversión de PDFs a PNG...")
    count = 0
    for filename in os.listdir(dir_path):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(dir_path, filename)
            try:
                doc = fitz.open(pdf_path)
                page = doc.load_page(0)  # load the first page
                
                # Render page to an image (150 DPI is high quality and reasonable size)
                pix = page.get_pixmap(dpi=150)
                
                # Output filename replacing .pdf with .png
                png_filename = filename[:-4] + ".png"
                png_path = os.path.join(dir_path, png_filename)
                
                pix.save(png_path)
                print(f"[OK] Convertido: {filename} -> {png_filename}")
                doc.close()
                count += 1
            except Exception as e:
                print(f"[!] Error al convertir {filename}: {e}")
    print(f"Conversión finalizada. Total archivos procesados: {count}")

if __name__ == "__main__":
    convert_all()
