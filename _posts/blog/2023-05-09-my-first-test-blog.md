---
layout: blog
title: My First Test Blog
date: 2023-05-09T01:25:14.520Z
thumbnail: /static/images/uploads/profile-seal.jpg
rating: 5
---
## AWS CLI Cheatsheet

Getting tired opening new tab for commands. So, I decided to collect the common commands on AWS CLI.

**[List users](https://docs.aws.amazon.com/cli/latest/reference/cognito-idp/list-users.html)**\
`aws cognito-idp list-users --profile your-aws-profile --region us-east-1 --user-pool-id us-east-1_your-pool-id`

List users with filter\
`aws cognito-idp list-users --profile your-aws-profile --region us-east-1 --user-pool-id us-east-1_your-pool-id --filter 'cognito:user_status = "FORCE_CHANGE_PASSWORD"'`

**[Get user](https://docs.aws.amazon.com/cli/latest/reference/cognito-idp/admin-get-user.html)**\
`aws cognito-idp admin-get-user --profile your-aws-profile --region us-east-1 --user-pool-id us-east-1_your-pool-id --username johndoe@mail.com`

**[Resend temporary password](https://docs.aws.amazon.com/cli/latest/reference/cognito-idp/admin-create-user.html)**\
`aws cognito-idp admin-create-user --profile your-aws-profile --region us-east-1 --user-pool-id us-east-1_your-pool-id --username johndoe@mail.com --message-action RESEND`