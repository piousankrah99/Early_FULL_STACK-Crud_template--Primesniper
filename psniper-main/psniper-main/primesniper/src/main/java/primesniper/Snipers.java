package primesniper;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "primesniperitemsdb")
@AllArgsConstructor

public class Snipers {

    public Snipers() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String item;
    private float price;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }



    public String getItem() {
        return item;
    }




    public void setItem(String item) {
        this.item = item;
    }



    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Sniper{" +
                "id=" + id +
                ", item='" + item + '\'' +
                ", price=" + price +
                '}';
    }
}
