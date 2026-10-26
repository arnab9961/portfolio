# D.M. Rafiun Bin Masud — Portfolio

Plain HTML/CSS portfolio served by Flask. Content is based on [arnab9961.github.io](https://arnab9961.github.io/).

## Structure

- `app.py` — Flask application and portfolio data.
- `templates/index.html` — semantic HTML template.
- `static/styles.css` — responsive styling and day/night theme.
- `api/index.py` — Vercel Python entrypoint.
- `requirements.txt` — Python dependency.

## Run locally

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Open [http://127.0.0.1:5000](http://127.0.0.1:5000).

## Deploy to Vercel

Import the repository as a new Vercel project. Select **Other** or allow Vercel to detect Python. Leave **Output Directory** blank. Do not select Next.js and do not set the output directory to `out` or `.next`.

Vercel uses `api/index.py` as the Python entrypoint.
