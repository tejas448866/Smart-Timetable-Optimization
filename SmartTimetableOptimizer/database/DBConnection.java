import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

    private static final String URL =
            "jdbc:mysql://localhost:3306/SmartTimetableDB";

    private static final String USER = "root";

    // Put your MySQL password here
    private static final String PASSWORD = "tanmayikt26012007";

    public static Connection getConnection() {

        try {

            // Load JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Connect to MySQL
            return DriverManager.getConnection(
                    URL,
                    USER,
                    PASSWORD
            );

        } catch (Exception e) {

            e.printStackTrace();
            return null;
        }
    }
}