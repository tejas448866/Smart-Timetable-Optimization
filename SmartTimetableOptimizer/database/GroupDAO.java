import java.sql.Connection;
import java.sql.PreparedStatement;

public class GroupDAO {

    public static void addGroup(String name, int students) {

        String sql =
                "INSERT INTO student_groups(name, students) VALUES (?, ?)";

        try {

            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, name);
            ps.setInt(2, students);

            int rows = ps.executeUpdate();

            if(rows > 0) {
                System.out.println("Group added: " + name);
            }

            ps.close();
            con.close();

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}