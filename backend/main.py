import uvicorn
from fastapi import *

app = FastAPI()

@app.get('/user')
async def add_user():
    return '{}'


if __name__ == '__main__':
    uvicorn.run(app=app, host="0.0.0.0", port=8000)