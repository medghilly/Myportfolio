# Fix Tailwind invalid opacity values in all TSX and CSS files
# Replace /3, /4, /6, /8, /12, /15 (non-standard) with arbitrary [X%] syntax

$files = Get-ChildItem -Recurse -Path "src" -Include "*.tsx","*.css"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content

    # Order matters: longer patterns first to avoid partial matches
    $content = $content -replace 'primary/15\b', 'primary/[15%]'
    $content = $content -replace 'primary/12\b', 'primary/[12%]'
    $content = $content -replace 'primary/8\b',  'primary/[8%]'
    $content = $content -replace 'primary/6\b',  'primary/[6%]'
    $content = $content -replace 'primary/4\b',  'primary/[4%]'
    $content = $content -replace 'primary/3\b',  'primary/[3%]'

    if ($content -ne $original) {
        Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
        Write-Host "Fixed: $($file.Name)"
    }
}
Write-Host "Done."
