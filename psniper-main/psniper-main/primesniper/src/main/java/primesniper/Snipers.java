package primesniper;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "primesniperitemsdb")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Snipers {

    public Snipers() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String item;
    private float price;

   
}
