! gh pr list; if [ $? = 0 ]; then git nuke-pr && exit 0; fi; \
BRANCH=\"$(git branch --show-current)\" && git checkout main \
&& git branch -D \"$BRANCH\" \
&& git ls-remote --exit-code --heads origin ${BRANCH} \
&& if [ $? = 0 ]; \
then git push origin --delete ${BRANCH}; else exit 0; fi;\
