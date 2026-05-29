
## 2024-05-29 - Array method spread operator allocations
**Learning:** Chaining `.sort()` onto a `.filter()` result array is safe and does not require an intermediate array clone using the spread operator (`[...filtered].sort()`), as `.filter()` already returns a new array instance.
**Action:** When memoizing derived state pipelines, eliminate redundant array clones on the results of immutable array methods to avoid unnecessary memory allocation on every recomputation.

## 2024-05-29 - Unintentional Repository Pollution
**Learning:** During test and validation cycles (especially involving Playwright scripts, new ESLint configurations, or temporary benchmarks), it is extremely easy to accidentally pollute the Git staging area with non-source artifacts (e.g., `server.log`, screenshots, local config files, benchmark scripts).
**Action:** Before committing, always run `git status` to verify the staging area is clean and exactly matches the requested optimization code. Drop any extraneous artifacts, even if they were useful during validation, to ensure a clean PR.
