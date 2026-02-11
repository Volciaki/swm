---
sidebar_position: 1
---

# Domain Driven Design (DDD)

When it comes to the backend we've used the DDD approach. The code is neatly divided into independent modules defining theirs own DTOs, use cases, and other typical structures you'd find in a DDD app. While we don't follow all practices you may stumble upon in typcial DDD implementations, such as for example event emitters, a large part of it is here and if you have previous experience with DDD you should be able to navigate through the codebase just fine.

Here's an example of how our smallest module looks like as of 11/02/2026:

```shell
$ tree monitoring    
monitoring
├── application
│   ├── dto
│   │   ├── CreateNotificationDTO.ts
│   │   └── shared
│   │       └── NotificationDTO.ts
│   └── use-cases
│       ├── CreateNotification.ts
│       └── GetNotifications.ts
├── domain
│   ├── entities
│   │   └── Notification.ts
│   ├── errors
│   │   ├── InvalidNotificationTypeValue.ts
│   │   └── MonitoringDomainError.ts
│   └── repositories
│       └── NotificationRepository.ts
└── infrastructure
    ├── entities
    │   └── DBNotification.ts
    ├── mappers
    │   └── NotificationMapper.ts
    ├── persistence
    │   └── DBNotificationRepository.ts
    └── schedule
        ├── ExpirationMonitoringTask.ts
        ├── ShelvesModifiedIllegallyMonitoringTask.ts
        └── UpcomingExpiryMonitoringTask.ts

14 directories, 14 files
```

If you want to learn more about DDD I recommend checking out this [guide](https://romanglushach.medium.com/domain-driven-design-ddd-a-guide-to-building-scalable-high-performance-systems-5314a7fe053c).
