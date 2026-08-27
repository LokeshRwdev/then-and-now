import os
import re

directories = ['src/app']
for root, _, files in os.walk(directories[0]):
    for file in files:
        if file.endswith('.tsx') and file != 'layout.tsx':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'Footer' in content:
                content = re.sub(r'import\s+Footer\s+from\s+["\']@/components/layout/Footer["\'];?\s*\n', '', content)
                content = re.sub(r'^\s*<Footer\s*/>\s*\n', '', content, flags=re.MULTILINE)
                content = re.sub(r'<Footer\s*/>', '', content)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
