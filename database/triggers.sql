DELIMITER $$

CREATE TRIGGER trg_CapNhatSiSo_Insert
AFTER INSERT ON DangKyHocPhan
FOR EACH ROW
BEGIN
  UPDATE LopHocPhan
  SET siSoHienTai = siSoHienTai + 1
  WHERE maLopHP = NEW.maLopHP;
END$$

CREATE TRIGGER trg_CapNhatSiSo_Delete
AFTER DELETE ON DangKyHocPhan
FOR EACH ROW
BEGIN
  UPDATE LopHocPhan
  SET siSoHienTai = siSoHienTai - 1
  WHERE maLopHP = OLD.maLopHP;
END$$

CREATE TRIGGER trg_KiemTraDangKyHopLe
BEFORE INSERT ON DangKyHocPhan
FOR EACH ROW
BEGIN
  DECLARE siso INT;
  DECLARE maxsiso INT;

  SELECT siSoHienTai, siSoToiDa INTO siso, maxsiso
  FROM LopHocPhan WHERE maLopHP = NEW.maLopHP;

  IF siso >= maxsiso THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Lớp đã đầy';
  END IF;
END$$

DELIMITER ;