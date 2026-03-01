#!/bin/bash
cd /vercel/share/v0-project
npx prisma generate
npx prisma db push --accept-data-loss
