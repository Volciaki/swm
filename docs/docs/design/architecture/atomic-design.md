---
sidebar_position: 2
---

# Atomic Design

On the other hand, on frontend we're using Atomic Design. Our components are divided into a clear hierarchical structure of atoms --> molecules --> organisms and finally templates.

This is how it looks like:

```shell
$ tree ui        
ui
│   [...]
├── atoms
│   ├── index.ts
│   ├── Paragraph
│   │   ├── index.module.scss
│   │   └── index.tsx
│   │   [...]
├── molecules
│   ├── index.ts
│   ├── PageHeader
│   │   └── index.tsx
│   │   [...]
├── organisms
│   ├── index.ts
│   ├── QRCodeScanner
│   │   ├── index.module.scss
│   │   └── index.tsx
│   │   [...]
└── templates
    ├── index.ts
    ├── LoginFlow
    │   └── index.tsx
    │   [...]

71 directories, 113 files
```

To learn more, give [this](https://atomicdesign.bradfrost.com/chapter-2/) a read.
