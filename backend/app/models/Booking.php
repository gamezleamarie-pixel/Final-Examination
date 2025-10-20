<?php
class Booking {
  private $conn;
  private $table = "bookings";

  public $id;
  public $customer_name;
  public $room_type;
  public $check_in;
  public $check_out;
  public $status;

  public function __construct($db) {
    $this->conn = $db;
  }

  public function read() {
    $query = "SELECT * FROM {$this->table} ORDER BY id DESC";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  public function create() {
    $query = "INSERT INTO {$this->table} (customer_name, room_type, check_in, check_out, status)
              VALUES (:customer_name, :room_type, :check_in, :check_out, :status)";
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(":customer_name", $this->customer_name);
    $stmt->bindParam(":room_type", $this->room_type);
    $stmt->bindParam(":check_in", $this->check_in);
    $stmt->bindParam(":check_out", $this->check_out);
    $stmt->bindParam(":status", $this->status);

    return $stmt->execute();
  }

  public function update() {
    $query = "UPDATE {$this->table}
              SET customer_name = :customer_name,
                  room_type = :room_type,
                  check_in = :check_in,
                  check_out = :check_out,
                  status = :status
              WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":id", $this->id);
    $stmt->bindParam(":customer_name", $this->customer_name);
    $stmt->bindParam(":room_type", $this->room_type);
    $stmt->bindParam(":check_in", $this->check_in);
    $stmt->bindParam(":check_out", $this->check_out);
    $stmt->bindParam(":status", $this->status);
    return $stmt->execute();
  }

  public function delete() {
    $query = "DELETE FROM {$this->table} WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":id", $this->id);
    return $stmt->execute();
  }
}
?>

