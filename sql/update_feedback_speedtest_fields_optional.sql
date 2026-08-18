-- SQL migration: make TIM network speed test fields optional
ALTER TABLE feedbacks ALTER COLUMN download_speed DROP NOT NULL;
ALTER TABLE feedbacks ALTER COLUMN upload_speed DROP NOT NULL;
ALTER TABLE feedbacks ALTER COLUMN speedtest_url DROP NOT NULL;