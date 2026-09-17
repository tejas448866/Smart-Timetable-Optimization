import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class AcademicCalendarDAO {

    // Add a holiday
    public static void addHoliday(
            String holidayDate,
            String holidayName,
            String holidayType) {

        String sql =
                "INSERT INTO academic_calendar " +
                "(holiday_date, holiday_name, holiday_type) " +
                "VALUES (?, ?, ?)";

        try {

            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, holidayDate);
            ps.setString(2, holidayName);
            ps.setString(3, holidayType);

            int rows = ps.executeUpdate();

            if (rows > 0) {
                System.out.println("Holiday added: " + holidayName);
            }

            ps.close();
            con.close();

        } catch (Exception e) {

            e.printStackTrace();
        }
    }

    // Check whether a particular date is a holiday
    public static boolean isHoliday(String date) {

        String sql =
                "SELECT * FROM academic_calendar " +
                "WHERE holiday_date = ?";

        try {

            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, date);

            ResultSet rs = ps.executeQuery();

            boolean found = rs.next();

            rs.close();
            ps.close();
            con.close();

            return found;

        } catch (Exception e) {

            e.printStackTrace();
            return false;
        }
    }

    // Get holiday name for a particular date
    public static String getHolidayName(String date) {

        String sql =
                "SELECT holiday_name FROM academic_calendar " +
                "WHERE holiday_date = ?";

        try {

            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, date);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                String name = rs.getString("holiday_name");

                rs.close();
                ps.close();
                con.close();

                return name;
            }

            rs.close();
            ps.close();
            con.close();

        } catch (Exception e) {

            e.printStackTrace();
        }

        return null;
    }
}