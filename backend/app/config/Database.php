<?php
// Simple PDO connection wrapper

class Database {
    private $host = '127.0.0.1';
    private $db   = 'hotel_booking';
    private $user = 'root';
    private $pass = '';
    private $charset = 'utf8mb4';

    public function getConnection() : PDO {
        $dsn = "mysql:host={$this->host};dbname={$this->db};charset={$this->charset}";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            return new PDO($dsn, $this->user, $this->pass, $options);
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'Unknown database') !== false) {
                $dsnNoDb = "mysql:host={$this->host};charset={$this->charset}";
                $pdo = new PDO($dsnNoDb, $this->user, $this->pass, $options);
                $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$this->db}` CHARACTER SET {$this->charset} COLLATE utf8mb4_unicode_ci");
                return new PDO($dsn, $this->user, $this->pass, $options);
            }
            throw $e;
        }
    }
}

