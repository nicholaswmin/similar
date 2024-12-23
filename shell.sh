#!/bin/bash

gh pr list; \
test $? -eq 0 || echo "something bad happened" \
BRANCH=$(git branch --show-current) && git checkout main \
&& git branch -D "${BRANCH}" \
&& git ls-remote --exit-code --heads origin "${BRANCH}" \
&& if git ls-remote --exit-code --heads origin "${BRANCH}"; \
then git push origin --delete "${BRANCH}"; else exit 0; fi;\

if [ $? -ne 0 ]; then
    echo "Error"
fi
