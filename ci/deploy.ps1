# 确保脚本抛出遇到的错误
$ErrorActionPreference = 'Stop'

# 生成一个随机的SHA-256哈希值
Add-Type -AssemblyName System.Core
Add-Type -AssemblyName System.Security
$bytes = New-Object Byte[] 32
[System.Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($bytes)
$hash_value = [System.Convert]::ToBase64String($bytes)

# 将哈希值保存到文件中
Set-Content -Path .\hash_version.txt -Value $hash_value

# 输出确认
Write-Host "Generated hash version: $hash_value"
Write-Host "Hash version saved to hash_version.txt"

# 将所有文件添加到缓存区
git add .

# 提交信息附加 hash 版本号
git commit -m "deploy: $hash_value"

# 推送到远程仓库
git push https://github.com/indulgeback/indulgeback.git dev:dev