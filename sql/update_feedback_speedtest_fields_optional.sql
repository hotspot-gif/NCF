-- SQL migration: add TIM network speed test result fields (optional)
ALTER TABLE feedbacks
  ADD COLUMN tim_download_speed double precision,
  ADD COLUMN tim_upload_speed double precision,
  ADD COLUMN tim_speedtest_url varchar(2048);