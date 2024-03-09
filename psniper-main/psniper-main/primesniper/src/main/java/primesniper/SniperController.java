package primesniper;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")

@Controller
@AllArgsConstructor
@RequestMapping(path = "/api/v1/primeSniper/")

public class SniperController {

   private SniperService sniperService;



    @GetMapping(path = "index")
    public String getSniper(Model model){

        Snipers newItem = new Snipers();

        model.addAttribute("newItem", newItem);

        Snipers existingSniper = new Snipers();

        model.addAttribute("existingSniper", existingSniper);


        return "index";
    }

    @GetMapping(path = "getAllItems")
    @ResponseBody   // This annotation tells Spring to directly return the data as the response body
    public List<Snipers> allItems(Model model){
        model.addAttribute("Snipers", new Snipers());

        return sniperService.getAllItems() ;
    }


    @PostMapping(path = "addItems")
    public String addItems(@RequestBody Snipers insertData){

        sniperService.addItem(insertData);
        return "redirect:/api/v1/primeSniper/index";

    }

    @PostMapping("addItem")
    public String addItem(@RequestBody Snipers item){

        sniperService.addItem(item);
        return "redirect:/api/v1/primeSniper/index";
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Snipers getSniper(@PathVariable("id") Long id, Model model){
        model.addAttribute("updateItem", new Snipers());

        return sniperService.getSnipersById(id);
    }

    @PutMapping("/updates")
        public String updateItem(@RequestBody Snipers updateItem) {

        Snipers existingSniper = sniperService.getSnipersById(updateItem.getId());
        existingSniper.setItem(updateItem.getItem());
        existingSniper.setPrice(updateItem.getPrice());

        sniperService.updateItem(existingSniper);
            return "index";

    }


    @PutMapping("/update")
    public String updateSniper(@RequestBody Snipers updateItem) {


        Snipers existingSniper = sniperService.getSnipersById(updateItem.getId());
        existingSniper.setItem(updateItem.getItem());
        existingSniper.setPrice(updateItem.getPrice());

        sniperService.updateItem(existingSniper);
        return "redirect:/api/v1/primeSniper/index";
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String>  deleteItem( Snipers deletedItem, @PathVariable("id")Long id){
        try {
            sniperService.deleteItem(id);
            return ResponseEntity.ok().build();

        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
}

    @GetMapping("css/styles.css")
    public String getStyles() {
        return "forward:/static/css/styles.css";
    }

    @GetMapping("js/index.js")
    public String getIndexJs() {
        return "forward:/static/js/index.js";
    }

}
