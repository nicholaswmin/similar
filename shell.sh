#!/bin/bash

delete_branch () {
    gh pr list; \
    test $? -eq 1 || delete_pr && exit 0; \
    BRANCH=$(git branch --show-current) && git checkout main \
    && git branch -D "${BRANCH}" \
    && git ls-remote --exit-code --heads origin "${BRANCH}" \
    && if git ls-remote --exit-code --heads origin "${BRANCH}"; \
    then git push origin --delete "${BRANCH}"; else exit 0; fi;\
}


delete_pr () {
    echo "deleting pr"
}

delete_branch
