echo "# WhatsAppAiHelper" >> README.md

git init

git remote set-url origin https://github.com/napescui/veo3.git

echo "autoforce.sh" >> .gitignore

git rm --cached autoforce.sh 2> /dev/null

git add README.md

git add -A

git commit -m "sync full local to remote" 2> /dev/null

git push -f origin main