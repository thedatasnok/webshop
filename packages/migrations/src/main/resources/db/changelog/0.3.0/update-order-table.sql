ALTER TABLE "order" ADD COLUMN ordered_at TIMESTAMP DEFAULT NOW();
ALTER TABLE "order" DROP COLUMN total;