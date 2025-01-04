Project Overview:
Many thanks to  llamaXc (https://github.com/llamaXc) with out whitch I could have never finished this poject.


Build Steps if you want to tweak and build on this project:
- Have node installed
- Download src code
- Run `npm install`
- Build the application using: `electron-packager . --platform=win32 --arch=ia32 --out=dist --overwrite`
- Launch via ./dist/F16DEDWriter-win-32-ia32/F16DEDWriter.exe
- Note: for some reason you must rebuild the project using electron-packager each time you make a change, this is so the dll/.node files are copied to the correct spot. I have not found a way to bypass this, but it works!

![WinWing_IPC_Xplane (4)](https://github.com/user-attachments/assets/22fe8b29-8820-4594-a294-70a272a8ffa6)
